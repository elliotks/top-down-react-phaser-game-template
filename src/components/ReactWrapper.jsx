import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useResizeObserver } from 'beautiful-react-hooks';

// Constants
import { OVERLAY_DIV_RESIZE_THRESHOLD } from '../constants';

// Hooks
import useMutationObserver from '../hooks/useMutationObserver';

// Components
import DialogBox from './DialogBox';
import GameMenu from './GameMenu';
import GameText from './GameText';
import Battle from './Battle';

// Selectors
import { selectGameCanvasElement } from '../redux/selectors/selectGameData';
import { selectDialogMessages } from '../redux/selectors/selectDialog';
import { selectMenuItems } from '../redux/selectors/selectMenu';
import { selectTexts } from '../redux/selectors/selectText';

const ReactWrapper = () => {
    const canvas = useSelector(selectGameCanvasElement);
    const dialogMessages = useSelector(selectDialogMessages);
    const menuItems = useSelector(selectMenuItems);
    const gameTexts = useSelector(selectTexts);
    const ref = useMemo(() => ({ current: canvas }), [canvas]);
    const DOMRect = useResizeObserver(ref, OVERLAY_DIV_RESIZE_THRESHOLD);

    const [mutatedStyles, setMutatedStyles] = useState({});
    const defaultStyles = useMemo(() => ({
        // backgroundColor: '#fff',
        position: 'absolute',
        ...DOMRect,
    }), [DOMRect]);

    useMutationObserver(ref, () => {
        setMutatedStyles({
            marginLeft: canvas?.style?.marginLeft,
            marginTop: canvas?.style?.marginTop,
        });
    });

    return (
        <div
            style={{
                ...defaultStyles,
                ...mutatedStyles,
            }}
        >
            <Battle />
            {dialogMessages.length > 0 && (
                <DialogBox />
            )}
            {menuItems.length > 0 && (
                <GameMenu />
            )}
            {gameTexts.length > 0 && gameTexts.map((text) => {
                const { key, variables, config } = text;

                return (
                    <GameText
                        key={key}
                        translationKey={key}
                        variables={variables}
                        config={config}
                    />
                );
            })}
        </div>
    );
};

export default ReactWrapper;
