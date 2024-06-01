import { ReactNode, createContext, useState } from "react";

import { BsList } from "react-icons/bs";
import { RiLayoutGridFill } from "react-icons/ri";

interface GridProps {
  children: ReactNode
}

interface ContextProps {
  grid: string
  handleChangeGridLayout: () => void
  focusMode: ReactNode
  gridMode: ReactNode
}

// grid modes: grid | focus
export const GridContext = createContext<ContextProps>({
  grid: 'focus',
  handleChangeGridLayout: () => { },
  focusMode: <BsList />,
  gridMode: <RiLayoutGridFill />
});

export const GridProvider = ({ children }: GridProps) => {
  const [grid, setGrid] = useState<string>('grid');

  const handleChangeGridLayout = () => {
    setGrid(grid === 'focus' ? 'grid' : 'focus');
  };

  const focusMode = <BsList />;
  const gridMode = <RiLayoutGridFill />;

  const options = {
    handleChangeGridLayout,
    grid,
    gridMode,
    focusMode
  }

  return (
    <GridContext.Provider value={options}>
      {children}
    </GridContext.Provider>
  )
}