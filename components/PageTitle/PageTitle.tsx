type PageTitleProps = {
  children: string;
};

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <h1 className="text-4xl text-white text-center py-8 font-black bg-[#171717]">
      {children} page
    </h1>
  );
};

export default PageTitle;
