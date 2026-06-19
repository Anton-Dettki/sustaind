import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/legal-acts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/legal-acts"!</div>
}
