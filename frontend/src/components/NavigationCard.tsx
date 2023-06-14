import Card from "./Card";

const NavigationCard = () => {
  return (
    <div className="flex mt-4 max-w-4xl mx-auto gap-6">
      <div className="w-1/3">
        <Card>
          <h2>ADVENTURE.NET</h2>
          <a href="" className="block">Feed</a>
          <a href="" className="block">Explore</a>
          <a href="" className="block">Notifications</a>
          <a href="" className="block">Messaages</a>
          <a href="" className="block">Bookmarks</a>
          <a href="" className="block">My profile</a>
          <a href="" className="block">Settings</a>
          <a href="" className="block">Logout</a>
        </Card>
      </div>
    </div>
  );
};
  
export default NavigationCard;