export const TextArea = ({ placeholder, id, style, handleChange, content }) => {
    return (
        <p
            before={placeholder}
            id={id}
            contentEditable="true"
            suppressContentEditableWarning={true}
            spellCheck="false"
            className={`outline-0 empty:opacity-[0.2] empty:before:content-[attr(before)] ${style}`}
            onInput={handleChange}>{content}</p>
    )
};