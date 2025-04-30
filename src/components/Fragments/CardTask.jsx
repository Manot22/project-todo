import { format } from "date-fns";
import idLocale from "date-fns/locale/id";

const CardTask = (props) => {
  const { mainTitle, children } = props;

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="max-w-2xl mx-6">
        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          {mainTitle}
        </h2>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {children}
        </div>
      </div>
    </div>
  );
};

const Header = (props) => {
  const { dueDate, isCompleted } = props;
  return (
    <div className="flex justify-between w-full items-center gap-x-4 text-xs">
      <time className="text-gray-500 ">
        {format(new Date(dueDate), "dd MMMM yyyy", {
          locale: idLocale,
        })}
      </time>
      <a
        href="#"
        className={
          isCompleted === false
            ? "relative z-10 rounded-full bg-red-400 px-3 py-1.5 font-medium text-white hover:bg-red-200 hover:text-gray-400"
            : "relative z-10 rounded-full bg-green-400 px-3 py-1.5 font-medium text-white hover:bg-green-200 hover:text-gray-400"
        }
      >
        {isCompleted === false ? "Belum Selesai" : "Sudah Selesai"}
      </a>
    </div>
  );
};

const Content = (props) => {
  const { title, description } = props;
  return (
    <div className="group relative">
      <h3 className="capitalize mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
        <div>
          <span className="absolute inset-0" />
          {title}
        </div>
      </h3>
      <p className="capitalize mt-5 line-clamp-3 text-sm/6 text-gray-600">
        {description}
      </p>
    </div>
  );
};

const Footer = (props) => {
  const { username } = props;
  return (
    <div className="relative mt-8 flex items-center gap-x-4">
      <div className="text-sm/6">
        <p className="capitalize font-semibold text-gray-900">
          <a>
            <span className="absolute inset-0" />
            {username}
          </a>
        </p>
      </div>
    </div>
  );
};

CardTask.Header = Header;
CardTask.Content = Content;
CardTask.Footer = Footer;

export default CardTask;
