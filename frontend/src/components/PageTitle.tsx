interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <div className="flex justify-between mt-8 font-bold">
      <h2 className="text-2xl text-mainGray">{title}</h2>
    </div>
  );
};

export default PageTitle;
