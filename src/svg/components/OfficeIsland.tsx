import React from 'react'
import { G, Rect } from 'react-native-svg';

interface OfficeIslandProps {
    rows: number;
    columns: number;
    startX: number;
    startY: number;
    widthBureau: number;
    heightBureau: number;
}

export default function OfficeIsland({ rows, columns, startX, startY, widthBureau, heightBureau }: OfficeIslandProps) {
    return (
        <G>
            {[...Array(rows)].map((_x, indexX) =>
                <G key={indexX}>
                    {[...Array(columns)].map((_y, indexY) =>
                        <Rect key={indexY} strokeWidth="1" stroke="#000" height={heightBureau} width={widthBureau} y={startY + (heightBureau * indexY)} x={startX + (widthBureau * indexX)} fill="#00bf5f" />
                    )}
                </G>
            )}

        </G>
    );
}