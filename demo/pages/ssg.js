export default function SSGPage({ message, timestamp }) {
    return (
        <div>
            <h1>Static Site Generation (SSG)</h1>
            <p>{message}</p>
            <p>Generated at: {timestamp}</p>
        </div>
    );
}

export async function getStaticProps() {
    const timestamp = new Date().toLocaleString();
    return {
        props: {
            message: "Trang này được tạo sẵn tại build time!",
            timestamp,
        },
    };
}