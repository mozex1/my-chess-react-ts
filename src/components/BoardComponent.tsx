import React, { FC, useState, useEffect } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
	currentPlayer: Player | null;
	swapPlayer: () => void;
};

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
	const [ selectedCell, setSelectedCell ] = useState<Cell | null>(null);

	function click(cell: Cell) {

		if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
			selectedCell.moveFigure(cell);
			swapPlayer();
			setSelectedCell(null);
		  } else {
			if(cell.figure?.color === currentPlayer?.color) {
				setSelectedCell(cell);
			}
		  };
	};

	useEffect(() => {
		highlightCells();
	}, [selectedCell])

	function highlightCells() { // Подсвечивание ячеек, на которые доступен ход
		board.highlightCells(selectedCell);
		updateBoard();
	};

	function updateBoard(){
		const newBoard = board.getCopyBoard();
		setBoard(newBoard);
	}

	const ViewCells = () =>  {
		return (
			<>
				{
					board.cells.map((row, index) =>
					<React.Fragment key={index}>
						{row.map(cell =>
						<CellComponent
							click={click}
							cell={cell}
							key={cell.id}
							selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
						/>
						)}
					</React.Fragment>
					)
				}
			</>
		)
	}
	

    return (
		<div>
			<h3>Сейчас ходят: {currentPlayer?.color}</h3>
			<div className="board">
				 <ViewCells/>
			</div>
		</div>
    )
};


export default BoardComponent;