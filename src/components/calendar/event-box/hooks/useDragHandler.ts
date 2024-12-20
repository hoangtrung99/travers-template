import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { useSetAtom } from 'jotai'
import { useAtomValue } from 'jotai'
import { type RefObject, useEffect } from 'react'
import { eventAtom, isDraggingAtom, previewContainerAtom } from '../atom'

export const useDragHandler = (ref: RefObject<HTMLDivElement | null>) => {
  const event = useAtomValue(eventAtom)
  const setIsDragging = useSetAtom(isDraggingAtom)
  const setPreviewContainer = useSetAtom(previewContainerAtom)

  useEffect(() => {
    if (!ref.current) return

    const cleanup = draggable({
      element: ref.current,
      getInitialData: () => ({ event }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => {
        setIsDragging(false)
        setPreviewContainer(null)
      },
      onGenerateDragPreview({ nativeSetDragImage }) {
        setCustomNativeDragPreview({
          render({ container }) {
            setPreviewContainer(container)
          },
          nativeSetDragImage,
          getOffset: () => ({ x: 8, y: 8 })
        })
      }
    })

    return cleanup
  }, [event, ref, setIsDragging, setPreviewContainer])
}
