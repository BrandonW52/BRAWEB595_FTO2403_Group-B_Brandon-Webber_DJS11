// Basic error page that displays the error form Store.jsx

export default function Error(error) {
  return (
    <div className="h-full pb-14">
      <div className="bg-error rounded-xl p-4 my-3 mx-4">
        <h2 className="text-3xl text-backgrond-colour">Error Message:</h2>
        {/* Error message */}
        <p className="text-grey">{JSON.stringify(error.message)}</p>

        {/* Error stack */}
        <p className="text-xs text-grey">{JSON.stringify(error.stack)}</p>
      </div>
    </div>
  );
}
