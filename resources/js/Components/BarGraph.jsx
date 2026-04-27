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
                    label: "Enquiries",
                    data: Data.map((record) => record.enquiries),
                    backgroundColor: getBarColors(),
                    borderRadius: 8,
                    borderWidth: 0,
                    hoverBackgroundColor: getBarColors().map(c => c.replace('0.7', '0.9')),
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
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: {
                            color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                            font: { size: 11 }
                        },
                        grid: { display: false }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                            font: { size: 11 },
                            stepSize: 1
                        },
                        grid: {
                            color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                        titleColor: isDark ? '#f3f4f6' : '#111827',
                        bodyColor: isDark ? '#d1d5db' : '#374151',
                        borderColor: isDark ? '#374151' : '#e5e7eb',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 12,
                        displayColors: true,
                    },
                    legend: {
                        display: false,
                    },
                },
            }}
        />
    );
}
