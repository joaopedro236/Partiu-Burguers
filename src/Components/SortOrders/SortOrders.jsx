import { useRef, useState } from "react"
import "./sortOrders.css"

export default function SortOrders({ section, order, setOrder }) {
  const draggedId = useRef(null)
  const [draggingId, setDraggingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  async function saveOrder(nextOrder, previousOrder) {
    setOrder(nextOrder)
    setSaving(true)
    setMessage("Salvando nova ordem…")

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/updateOrderSequence`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          orderIds: nextOrder.map((item) => item.Id),
        }),
      })
      const result = await response.json()

      if (!response.ok || result?.Status !== true) {
        throw new Error(result?.Error || "Não foi possível salvar a ordem.")
      }

      setMessage("Ordem salva. O cardápio público será atualizado.")
    } catch (error) {
      setOrder(previousOrder)
      setMessage(error.message || "Erro ao salvar a ordem dos pedidos.")
    } finally {
      setSaving(false)
    }
  }

  function moveOrder(sourceId, targetId) {
    if (saving) return
    const sourceIndex = order.findIndex((item) => String(item.Id) === String(sourceId))
    const targetIndex = order.findIndex((item) => String(item.Id) === String(targetId))
    if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return

    const nextOrder = [...order]
    const [movedOrder] = nextOrder.splice(sourceIndex, 1)
    nextOrder.splice(targetIndex, 0, movedOrder)
    saveOrder(nextOrder, order)
  }

  function moveByKeyboard(index, direction) {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= order.length) return
    moveOrder(order[index].Id, order[targetIndex].Id)
  }

  return (
    <section className={`sortOrders ${section === "sortOrders" ? "flex" : "hidden"}`}>
      <header>
        <h1>Ordenar pedidos</h1>
        <p>Arraste os itens para alterar a ordem exibida no cardápio Partiu Burguer.</p>
      </header>

      <p className="sortOrdersStatus" role="status" aria-live="polite">{message}</p>

      {order.length === 0 ? (
        <p className="sortOrdersEmpty">Nenhum pedido disponível para ordenar.</p>
      ) : (
        <ol className="sortOrdersList" aria-label="Pedidos na ordem atual" aria-busy={saving}>
          {order.map((item, index) => (
            <li
              className={`sortOrdersItem ${draggingId === item.Id ? "isDragging" : ""}`}
              key={item.Id ?? index}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault()
                if (draggedId.current !== null) moveOrder(draggedId.current, item.Id)
                draggedId.current = null
                setDraggingId(null)
              }}
            >
              <span
                className="sortOrdersHandle"
                draggable={!saving}
                onDragStart={(event) => {
                  draggedId.current = item.Id
                  setDraggingId(item.Id)
                  event.dataTransfer.effectAllowed = "move"
                  event.dataTransfer.setData("text/plain", String(item.Id))
                }}
                onDragEnd={() => {
                  draggedId.current = null
                  setDraggingId(null)
                }}
                aria-label={`Arrastar ${item.Name}`}
                title="Arraste para reordenar"
              >
                ⠿
              </span>
              <span className="sortOrdersPosition">{index + 1}</span>
              {item.Imagem_url && <img src={item.Imagem_url} alt="" />}
              <span className="sortOrdersName">{item.Name || "Pedido sem nome"}</span>
              <div className="sortOrdersActions">
                <button
                  type="button"
                  onClick={() => moveByKeyboard(index, -1)}
                  disabled={saving || index === 0}
                  aria-label={`Mover ${item.Name} para cima`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveByKeyboard(index, 1)}
                  disabled={saving || index === order.length - 1}
                  aria-label={`Mover ${item.Name} para baixo`}
                >
                  ↓
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
