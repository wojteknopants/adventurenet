import Card from "./Card";

const LoadingCard = ({ children }: any) => {
  return (
    <Card noPadding={false}>
      <p className="text-mainGray animate-pulse">{children}</p>
    </Card>
  );
};

export default LoadingCard;
