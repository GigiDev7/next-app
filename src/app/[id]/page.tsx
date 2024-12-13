import axios from "axios";
import Facility from "./_components/facility";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const result = await axios.get(
    `https://my-app.gigivadachkoria.workers.dev/facility/${id}`
  );

  return (
    <div className="p-8">
      <Facility facility={result.data.data} />
    </div>
  );
};

export default Page;
