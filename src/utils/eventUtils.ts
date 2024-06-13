export function getEventDetail(event: Event) {
    switch (event.type) {
        case "Goal":
            // @ts-ignore
            switch (event.detail) {
                case "Normal Goal":
                    return "scored a goal!";
                case "Own Goal":
                    return "scored an own goal!";
                case "Penalty":
                    return "scored a penalty!";
                case "Missed Penalty":
                    return "missed a penalty!";
                default:
                    // @ts-ignore
                    return event.detail;
            }
        case "Card":
            // @ts-ignore
            switch (event.detail) {
                case "Yellow Card":
                    return "received a yellow card.";
                case "Red Card":
                    return "received a red card.";
                default:
                    // @ts-ignore
                    return event.detail;
            }
        case "Subst":
            // @ts-ignore
            return `Substitution ${event.detail}`;
        case "Var":
            // @ts-ignore

            switch (event.detail) {
                case "Goal cancelled":
                    return "goal was cancelled.";
                case "Penalty confirmed":
                    return "penalty was confirmed.";
                default:
                    // @ts-ignore
                    return event.detail;
            }
        default:
            // @ts-ignore
            return event.detail;
    }
}
