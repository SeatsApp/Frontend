import React from 'react'
import { Dimensions, View, Platform } from 'react-native'
import Svg, { G, Polyline } from 'react-native-svg'
import OfficeIsland from '../../components/OfficeIsland'

export default function XploreGroupFloor1() {
    const originalWidth = 1600;
    const originalHeight = 2100;

    const aspectRatio = originalWidth / originalHeight;
    const windowWidth = Dimensions.get("window").width / (Platform.OS === 'web' ? 3.5 : 1.5);

    return (<View style={{ display: 'flex', alignItems: 'center' }}>
        <View style={{ width: windowWidth, aspectRatio }}>
            <Svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${originalWidth} ${originalHeight}`}>
                <G>
                    <Polyline
                        //width,height
                        points="0,0 1600,0 1600,1800 1000,1800 1000,2100 0,2100 0,0"
                        fill="none"
                        stroke="black"
                        strokeWidth="15"
                    />
                    <G>
                        <OfficeIsland rows={2} columns={2} startX={100} startY={5} heightBureau={200} widthBureau={100} />
                        <OfficeIsland rows={2} columns={2} startX={500} startY={5} heightBureau={200} widthBureau={100} />
                        <OfficeIsland rows={2} columns={2} startX={900} startY={5} heightBureau={200} widthBureau={100} />
                        <OfficeIsland rows={2} columns={2} startX={1300} startY={5} heightBureau={200} widthBureau={100} />
                    </G>


                    <G>
                        <OfficeIsland rows={3} columns={2} startX={5} startY={605} heightBureau={100} widthBureau={200} />
                        <OfficeIsland rows={3} columns={2} startX={995} startY={605} heightBureau={100} widthBureau={200} />
                    </G>

                    <G>
                        <OfficeIsland rows={3} columns={2} startX={5} startY={1005} heightBureau={100} widthBureau={200} />
                        <OfficeIsland rows={3} columns={2} startX={995} startY={1005} heightBureau={100} widthBureau={200} />
                    </G>

                    <G>
                        <OfficeIsland rows={3} columns={2} startX={5} startY={1405} heightBureau={100} widthBureau={200} />
                        <OfficeIsland rows={3} columns={2} startX={995} startY={1405} heightBureau={100} widthBureau={200} />
                    </G>

                    <G>
                        <OfficeIsland rows={3} columns={2} startX={5} startY={1805} heightBureau={100} widthBureau={200} />
                    </G>
                </G>
            </Svg>
        </View>
    </View>)
}