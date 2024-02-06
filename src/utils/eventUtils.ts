export function getEventDetail(event: Event) {
    switch (event.type) {
        case "Goal":
            // @ts-ignore
            switch (event.detail) {
                case "Normal Goal":
                    return "Scored a goal";
                case "Own Goal":
                    return "Scored an own goal";
                case "Penalty":
                    return "Scored a penalty";
                case "Missed Penalty":
                    return "Missed a penalty";
                default:
                    // @ts-ignore
                    return event.detail;
            }
        case "Card":
            // @ts-ignore
            switch (event.detail) {
                case "Yellow Card":
                    return "Received a yellow card";
                case "Red Card":
                    return "Received a red card";
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
                    return "Goal was cancelled";
                case "Penalty confirmed":
                    return "Penalty was confirmed";
                default:
                    // @ts-ignore
                    return event.detail;
            }
        default:
            // @ts-ignore
            return event.detail;
    }
}
