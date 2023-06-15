import Card from "./Card";
import Searchbar from "./Searchbar"

const Contacts = () => {
  return (
    <div className="fixed flex flex-col justify-between p-[10px] mb-0.5">
      <div className="flex-col"><Searchbar/></div>
      {/* <div className="w-48 h-48">
      <Card noPadding={false}>
        </Card>
      </div> */}
      <div className="w-[320px] h-[400px] shadow-inner bg-slate-100 pt-30 rounded-md"></div>
    </div>
  );
};

export default Contacts;
