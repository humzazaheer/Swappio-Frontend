import { Link } from "react-router";


export const Button = ({
  btnId,
  btnText,
  href,
  btnClass,
  icon,
  type,
  name,
  clickEvent,
  children,
  disabled,
  align,
  target,
  download,
  ...props
}) => {
  let classes = `flex items-center max-w-fit justify-center gap-2 mt-8 bg-linear-to-r from-violet-600 to-violet-800 hidden md:flex  text-white px-5 py-2 rounded-full text-md font-medium hover:bg-black-700 transition cursor-pointer`;

  if (align === "center") {
    classes += " mx-auto";
  } else if (align === "right") {
    classes += " ml-auto";
  }


  const finalClass = btnClass + classes ;

  const handleClick = (e) => {
    if (clickEvent) {
      clickEvent(e);
    }
  };

  const content = (
    <>
      {icon && icon}
      {btnText}
      {children}
    </>
  );

  return href ? (
    <Link to={href} className={finalClass} id={btnId && btnId} target={target} {...(download ? { download } : { })} 
      {...props}>
      {content}
    </Link>
  ) : (
    <button
      onClick={handleClick}
      type={type || "button"}
      className={finalClass}
      name={name}
      id={btnId && btnId}
      {...(disabled ? { disabled } : { })}
      {...props}
    >
      {content}
    </button>
  );
};
