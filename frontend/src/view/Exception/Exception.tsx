const Exception = ({ message }: { message: string }) => {
    return (
        <div className="container m-5">
            <p color="red">{message}</p>
        </div>
    );
};

export default Exception;
