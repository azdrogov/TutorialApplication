import { Form, Field } from 'react-final-form'

const CreateTutorialForm = (props) => {
    const { onSubmit } = props;

    return (
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title</label>
                        <Field
                            name="title"
                            component="input"
                            type="text"
                            placeholder="Название"
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <Field
                            name="description"
                            component="input"
                            type="text"
                            placeholder="Описание"
                        />
                    </div>
                    <div>
                        <Field
                            name="published"
                            component="input"
                            type="checkbox"
                            placeholder="Опубликовано?"
                        />
                    </div>

                    <button type="submit">Кнопка</button>
                </form>
            )}
        />
    )
}

export default CreateTutorialForm;