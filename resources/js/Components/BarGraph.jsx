import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

export default function BarGraph({ data = [], title = ''}) {
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
                    label: "# of enquiries",
                    data: Data.map((record) => record.enquiries),
                    backgroundColor: getBarColors(),
                    borderColor: isDark ? "rgba(255, 255, 255, 0.5)" : "black",
                    borderWidth: 1,
                }
            ],
        };
    }

    function getBarColors() {
        return [
                        'rgba(70, 97, 238, 0.7)',
                        'rgba(236, 86, 87, 0.7)',
                        'rgba(27, 205, 209, 0.7)',
                        'rgba(143, 170, 187, 0.7)',
                        'rgba(176, 139, 235, 0.7)',
                        'rgba(62, 160, 221, 0.7)',
                        'rgba(245, 165, 42, 0.7)',
                        'rgba(35, 191, 170, 0.7)',
                        'rgba(250, 165, 134, 0.7)',
                        'rgba(235, 140, 198, 0.7)',
                        'rgba(124, 252, 0, 0.7)',
                        'rgba(255, 215, 0, 0.7)'
                    ]
    }

    return (
        <Bar
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
