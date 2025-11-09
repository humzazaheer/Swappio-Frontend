const Alert = ({type, message}) => {
    let color;
    switch (type) {
        case 'success':
            color = 'green';
            break;
        case 'danger':
            color = 'red';
            break;
        case 'warning':
            color = 'yellow';
            break;
        case 'info':
            color = 'blue';
            break;
        default:
            color = 'gray';
    }

    const alertClasses = `bg-${color}-100 border-${color}-400 text-${color}-400 border-l-4 p-4`;

    return (
        <>
            <div className={alertClasses + ' border-l-4 p-4'} role="alert">
                
                <p>
                    {message}
                </p>
            </div>
        </>
    )
}
export default Alert