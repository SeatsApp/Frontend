import React from 'react'
import { G, Rect, Text } from 'react-native-svg';

interface OfficeIslandProps {
    rows: number;
    columns: number;
    startX: number;
    startY: number;
    widthBureau: number;
    heightBureau: number;
    islandId: string;
}

export default function OfficeIsland({ rows, columns, startX, startY, widthBureau, heightBureau, islandId }: OfficeIslandProps) {
    let i = 1;
    return (
        <G>
            {[...Array(rows)].map((_x, indexX) =>
                <G key={indexX}>
                    {[...Array(columns)].map((_y, indexY) =>
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        <G key={"" + islandId + i} name={"" + islandId + i} >
                            <Rect strokeWidth="1" stroke="#000" height={heightBureau} width={widthBureau} y={startY + (heightBureau * indexY)} x={startX + (widthBureau * indexX)} fill="#00bf5f" />
                            <Text y={(startY + (heightBureau * indexY) + (heightBureau / 2))} x={(startX + (widthBureau * indexX) + (heightBureau > widthBureau ? (widthBureau / 5) : (widthBureau / 3)))} fontSize={(heightBureau < widthBureau) ? (heightBureau / 2) : (widthBureau / 2)} fill="blue">{islandId + i++}</Text>
                        </G>
                    )}
                </G>
            )}
        </G>
    );
}