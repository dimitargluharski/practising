export function getEventDetail(event: Event) {
    switch (event.type) {
        case "Goal":
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
                    return event.detail;
            }
        case "Card":
            switch (event.detail) {
                case "Yellow Card":
                    return "Received a yellow card";
                case "Red Card":
                    return "Received a red card";
                default:
                    return event.detail;
            }
        case "Subst":
            return `Substitution ${event.detail}`;
        case "Var":
            switch (event.detail) {
                case "Goal cancelled":
                    return "Goal was cancelled";
                case "Penalty confirmed":
                    return "Penalty was confirmed";
                default:
                    return event.detail;
            }
        default:
            return event.detail;
    }
}
