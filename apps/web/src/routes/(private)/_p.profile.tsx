import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/_p/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello!</div>
}
