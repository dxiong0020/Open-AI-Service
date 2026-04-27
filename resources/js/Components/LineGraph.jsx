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
                    label: "Costs ($)",
                    data: Data.map((record) => record.cost),
                    fill: true,
                    backgroundColor: isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)",
                    borderColor: isDark ? "#60a5fa" : "#2563eb",
                    borderWidth: 3,
                    pointBackgroundColor: isDark ? "#60a5fa" : "#2563eb",
                    pointBorderColor: isDark ? "#1f2937" : "#ffffff",
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.4
                }
            ],
        };
    }

    return (
        <Line
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
                            callback: (value) => `$${value}`
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
                        callbacks: {
                            label: (context) => `Cost: $${context.parsed.y.toFixed(2)}`
                        }
                    },
                    legend: {
                        display: false,
                    },
                },
            }}
        />
    );
}
