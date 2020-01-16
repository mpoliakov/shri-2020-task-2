# Задание 2. Напишите линтер

Для реализации выбрал `TypeScript`, чтобы использовать преимущества статической типизации. Сборка проекта осуществляется с помощью `webpack`.

Из сторонних библиотек использовал - [json-to-ast](https://github.com/vtrushin/json-to-ast). Библиотека упрощает получение местоположения конкретного БЕМ-блока в файле.

### Подготовка json

Перед тем как проводить анализ, перевожу json во внутреннию структуру БЕМ-блоков ([BemBlock](src/bem/bem-block.ts), [BemBlockArray](src/bem/bem-block-array.ts)). За это отвечает функция jsonToBem ([json-to-bem.ts](src/bem/json-to-bem.ts)). Сначала функция переводит json с помощью json-to-ast в AST-сущности, затем AST-сущности переводятся в БЕМ-сущности, включая информацию о положении блока в файле.

### Правила проверки

Добавил абстрактный класс [LinterRule](src/linter-rules/linter-rule.ts), а так же выделил 2 типа правил, которые наследуются от него:

- Правило для конкретного блока - `NodeLinterRule`;
- Правило для всего документа - `DocumentLinterRule` (н-р, для всех правил типа "TEXT").

Реализация правил находится в папке [linter-rules](src/linter-rules): [warning](src/linter-rules/warning), [text](src/linter-rules/text), [grid](src/linter-rules/grid).

### Анализ json
За анализ отвечает класс [LinterStrategy](src/linter-strategy.ts). Функция lint() выполняет проход по документу и применяет правила проверки. Набор правил LinterStrategy получает из [configuration](src/linter-configuration.ts):
```ts
{
    WARNING: {
        TEXT_SIZES_SHOULD_BE_EQUAL: LinterRules.Warning.TextSizesShouldBeEqual,
        INVALID_BUTTON_SIZE: LinterRules.Warning.InvalidButtonSize,
        INVALID_BUTTON_POSITION: LinterRules.Warning.InvalidButtonPosition,
        INVALID_PLACEHOLDER_SIZE: LinterRules.Warning.InvalidPlaceholderSize
    },
    TEXT: {
        SEVERAL_H1: LinterRules.Text.SeveralH1,
        INVALID_H2_POSITION: LinterRules.Text.InvalidH2Position,
        INVALID_H3_POSITION: LinterRules.Text.InvalidH3Position
    },
    GRID: {
        TOO_MUCH_MARKETING_BLOCKS: LinterRules.Grid.TooMuchMarketingBlocks
    }
}
``` 

Выполняется один проход по дереву. В качестве результата возвращается массив [LinterProblem](src/linter-problem.ts).

Во время прохода правила для конкретных блоков выполняют проверку тут же, правила для всего документа сначала собирают потенциальные блоки, и в конце выполняют проверку, - сделано для оптимизации.

В файле [linter.ts](src/linter.ts) создаётся глобальная функция, которая получает экземпляр LinterStrategy и вызывает функцию lint().

### Unit-тесты
Для unit-тестирования использовал `Jest`. Тесты находятся в соответствующей папке [tests](tests).

