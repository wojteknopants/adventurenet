import Card from "../../components/Card";
import NavigationCard from "../../components/NavigationCard";

const FeedContext = () => {
  const testText = () => {
    return (
      <>
        <div>Text</div>
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
      <Card>Text2</Card>
      <NavigationCard></NavigationCard>
    </div>
  );
};

export default FeedContext;
