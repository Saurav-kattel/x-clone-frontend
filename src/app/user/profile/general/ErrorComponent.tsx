export default function ErrorComponent({ response }: { response: any }) {
  return <> <div className="text-red-600">
    {response && response.length > 0 ? "error occured" : null}
  </div>
    <div className="text-green-600">
      {response && response.length <= 0 ? "updated successfully" : null}
    </div>
  </>

} 
