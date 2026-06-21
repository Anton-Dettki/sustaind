import { Button } from '#/components/ui/button'
import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowRightIcon } from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
  <div>
    <div className="flex flex-row flex-wrap justify-center gap-4 my-15">
    <Card className="w-full max-w-md flex-1 min-w-[280px]">
      <CardHeader>
        <CardTitle>Rechtsnormen</CardTitle>
        <CardDescription>
          Verwalte deine Rechtsnormen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to="/Legal-acts">
            Zu den Rechtsnormen <ArrowRightIcon />
          </Link>
        </Button>
      </CardFooter>
    </Card>

    <Card className="w-full max-w-md flex-1 min-w-[280px]">
      <CardHeader>
        <CardTitle>Pflichten</CardTitle>
        <CardDescription>
          Verwalte deine Pflichten.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to="/Obligations" search={{ short: undefined }}>
            Zu den Pflichten <ArrowRightIcon />
          </Link>
        </Button>
      </CardFooter>
    </Card>
    </div>
  </div>
  )
}
