import Card from "../../components/Card";
import NavigationCard from "../../components/NavigationCard";
import PostFormCard from "../../components/PostFormCard";

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
      <div className="flex justify-between my-6">
        <h2 className="text-[24px]">Feed</h2>
        {/* <button>TurnOn</button> */}
      </div>

      {/* <div>{testText()}</div> */}
      <PostFormCard/ >
      <Card>
        Text2
      </Card>
    </div>
  );
};

export default FeedContext;
