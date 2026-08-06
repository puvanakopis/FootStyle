"use client";

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 mb-2">
        {title}
      </h1>
    </section>
  );
};

export default PageHeader;