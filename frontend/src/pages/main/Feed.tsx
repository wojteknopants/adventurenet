const FeedContext = () => {
  const testText = () => {
    return (
      <>
        <div>Essa</div>
        <div>Text</div>
        <div>Text</div>
        <div>Text</div>
      </>
    );
  };
  return (
    <div>
      <div className="flex justify-between mt-8">
        <h2 className="text-[24px]">Feed</h2>
        <button>TurnOn</button>
      </div>

      <div>{testText()}</div>
    </div>
  );
};

export default FeedContext;
