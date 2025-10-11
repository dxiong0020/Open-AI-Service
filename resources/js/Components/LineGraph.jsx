import { Line } from "react-chartjs-2";

export default function LineGraph({ data = [], title = ''}) {

    function formatData(data) {
        const Data = Array.isArray(data) ? data : [];
        return {
            labels: Data.map((record) => record.month),
            datasets: [
                {
                    label: "costs",
                    data: Data.map((record) => record.cost),
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    borderWidth: 1,
                    tension: 0.1
                }
            ],
        };
    }

    return (
        <Line 
            data={formatData(data)} 
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: title,
                    },
                    legend: {
                        display: false,
                    },
                },
            }}
        />
    );
}