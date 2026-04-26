import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

export default function LineGraph({ data = [], title = ''}) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        setIsDark(document.documentElement.classList.contains('dark'));
        return () => observer.disconnect();
    }, []);

    function formatData(data) {
        const Data = Array.isArray(data) ? data : [];
        return {
            labels: Data.map((record) => record.month),
            datasets: [
                {
                    label: "costs",
                    data: Data.map((record) => record.cost),
                    fill: false,
                    borderColor: isDark ? "rgb(125, 242, 242)" : "rgb(75, 192, 192)",
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
                scales: {
                    x: {
                        ticks: { color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' },
                        grid: { color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
                    },
                    y: {
                        ticks: { color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' },
                        grid: { color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'
                    },
                    legend: {
                        display: false,
                    },
                },
            }}
        />
    );
}
