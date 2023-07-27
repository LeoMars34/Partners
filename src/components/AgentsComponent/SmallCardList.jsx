import { SmallCard } from "./SmallCard";

/*Добавления нового пользователя на AgentCard*/
function SmallCardList({ catalog }) {
    return (
        <form className="container-agents-cards">
            {catalog.map((card) => (
                <SmallCard key={card.id} {...card} />
            ))}
        </form>
    );
}

export { SmallCardList };
