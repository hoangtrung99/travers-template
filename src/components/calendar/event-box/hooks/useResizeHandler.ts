import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { disableNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/disable-native-drag-preview'
import { preventUnhandled } from '@atlaskit/pragmatic-drag-and-drop/prevent-unhandled'
import { useAtomValue, useSetAtom } from 'jotai'
import { type RefObject, useEffect } from 'react'
import { DRAG_RESIZE_TYPE } from '../../constants'
import { getProposedWidth } from '../../utils'
import { eventTimeAtom, initialWidthAtom } from '../atom'

export const useResizeHandler = (
  dividerRef: RefObject<HTMLDivElement | null>,
  boxRef: RefObject<HTMLDivElement | null>
) => {
  const initialWidth = useAtomValue(initialWidthAtom)
  const setEventTime = useSetAtom(eventTimeAtom)

  useEffect(() => {
    const divider = dividerRef.current
    if (!divider) return

    return draggable({
      element: divider,
      getInitialData: () => ({ type: DRAG_RESIZE_TYPE }),
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        disableNativeDragPreview({ nativeSetDragImage })
        preventUnhandled.start()
      },
      onDrag({ location }) {
        const proposedWidth = getProposedWidth({ initialWidth, location })
        boxRef.current?.style.setProperty(
          '--local-resizing-width',
          `${proposedWidth}px`
        )
      },
      onDrop({ location }) {
        preventUnhandled.stop()
        const finalWidth = getProposedWidth({ initialWidth, location })
        setEventTime(finalWidth)
        boxRef.current?.style.removeProperty('--local-resizing-width')
      }
    })
  }, [initialWidth, setEventTime, boxRef, dividerRef])
}
