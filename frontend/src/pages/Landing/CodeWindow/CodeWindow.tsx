import { useEffect, useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { scenes } from './scenes'
import './CodeWindow.css'

type Phase = 'typing' | 'waiting' | 'notified' | 'leaving'

const TYPE_SPEED_MS = 9
const PAUSE_BEFORE_NOTIFY_MS = 500
const NOTIFICATION_DURATION_MS = 2800
const LEAVE_DURATION_MS = 300

// mock "typing → notification" loop cycling through the scenes above
function CodeWindow() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')

  const scene = scenes[sceneIndex]

  // reveal the code one character at a time
  useEffect(() => {
    if (phase !== 'typing') return

    if (charCount >= scene.code.length) {
      const t = setTimeout(() => setPhase('waiting'), 0)
      return () => clearTimeout(t)
    }

    const timer = setTimeout(() => setCharCount((c) => c + 1), TYPE_SPEED_MS)
    return () => clearTimeout(timer)
  }, [phase, charCount, scene.code.length])

  // drive the rest of the sequence: show notification → move to next scene
  useEffect(() => {
    if (phase === 'waiting') {
      const t = setTimeout(() => setPhase('notified'), PAUSE_BEFORE_NOTIFY_MS)
      return () => clearTimeout(t)
    }
    if (phase === 'notified') {
      const t = setTimeout(() => setPhase('leaving'), NOTIFICATION_DURATION_MS)
      return () => clearTimeout(t)
    }
    if (phase === 'leaving') {
      const t = setTimeout(() => {
        setSceneIndex((i) => (i + 1) % scenes.length)
        setCharCount(0)
        setPhase('typing')
      }, LEAVE_DURATION_MS)
      return () => clearTimeout(t)
    }
  }, [phase])

  const isTyping = phase === 'typing'
  const showNotification = phase === 'notified'

  return (
    <div
      className={`code-window ${phase === 'leaving' ? 'code-window--leaving' : ''}`}
      aria-hidden="true"
    >
      <div className="code-window__titlebar">
        <span className="dot dot--red" />
        <span className="dot dot--yellow" />
        <span className="dot dot--green" />
        <span className="code-window__filename">{scene.filename}</span>
      </div>

      <pre className="code-window__body">
        {scene.code.slice(0, charCount)}
        {isTyping && <span className="code-window__cursor" />}
      </pre>

      <div className={`code-window__overlay ${showNotification ? 'is-visible' : ''}`} />

      <div className={`code-window__notification ${showNotification ? 'is-visible' : ''}`}>
        <FiCheckCircle />
        <span>{scene.notification}</span>
      </div>
    </div>
  )
}

export default CodeWindow
