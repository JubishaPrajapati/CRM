
import './summaryCards.css';

const SummaryCard = ({ title, count, icon }) => {
    return (
        <div className="summary-card">
            <div className="summary-icon">
                <p>{icon}</p>
                <div className="summary-content">
                    <h4>{title}</h4>
                    <p>{count}</p>
                </div>
            </div>
        </div>
    )
}

export default SummaryCard;