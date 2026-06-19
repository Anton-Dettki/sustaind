import { Button } from '#/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
export const Route = createFileRoute('/')({ component: App })

function App() {
  const navigate = useNavigate()
  return (
  <div>
    <h1>Sustaind Rechtskataster</h1>

    <Button onClick={() => navigate({ to: '/legal-acts' })}> Go to legal acts</Button>
    <Button onClick={() => navigate({ to: '/obligations' })}> Go to obligations</Button>
  </div>
  )
}
