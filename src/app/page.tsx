import axios from "axios";
import Facilities from "./_components/facilities";

export default async function Home() {
  const result = await axios.get(
    "https://my-app.gigivadachkoria.workers.dev/facility"
  );

  return (
    <div className="p-8">
      <Facilities facilities={result.data.data} />
    </div>
  );
}
