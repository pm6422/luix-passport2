import {
  Card,
  CardContent,
} from "@/components/ui/card"

export default function ApiDocs() {
  return (
    <Card>
      <CardContent>
      <iframe src="swagger-ui/index.html" width="100%" height="900"></iframe>
      </CardContent>
    </Card>
  )
}
