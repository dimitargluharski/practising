type PathnameType = {
  pathname: string;
}

export const showPathname = ({ pathname }: PathnameType) => {
  switch (pathname) {
    case "/":
      return 'Dashboard';

    case "/live":
      return 'Live';

    case "/fixtures":
      return 'Fixtures';

    default:
      break;
  }
}