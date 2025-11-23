import { Link } from "react-router";


export const ButtonAnimated = ({
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
    let classes = `px-8 text-md font-bold py-2 text-violet-800 rounded-full bg-white flex`;

    if (align === "center") {
        classes += " mx-auto";
    } else if (align === "right") {
        classes += " ml-auto";
    }


    const finalClass = btnClass || classes;

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
        <div className="button-animated rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">

            <Link to={href} className={finalClass} id={btnId && btnId} target={target} {...(download ? { download } : {})}
                {...props}>
                {content}
            </Link>
        </div>
    ) : (
        <div className="button-animated rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">

            <button
                onClick={handleClick}
                type={type || "button"}
                className={finalClass}
                name={name}
                id={btnId && btnId}
                {...(disabled ? { disabled } : {})}
                {...props}
            >
                {content}
            </button>
        </div>
    );
};
