// Example

const ModuleMapper = require("./contrib/ModuleMapper")
const SequelizePlugin = require("./contrib/SequelizePlugin")
const {
    Observable
} = require("rx")
const Sequelize = require("sequelize")

const mapper = new ModuleMapper();
const persistence = new SequelizePlugin("mysql://example:example@localhost:3306/i18n");


persistence.defineModel("Lang", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    }
}, "langs")

persistence.defineModel("Translation", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lang_id: {
        type: Sequelize.INTEGER
    },
    section: {
        type: Sequelize.STRING
    },
    key: {
        type: Sequelize.STRING
    },
    value: {
        type: Sequelize.STRING
    }
}, "translations")

function TranslationEntity(options) {
    this.data = options
    this.distinct = (o) => o.value !== this.data.value
    this.query = {
        where: {
            lang_id: options.lang_id,
            section: options.section,
            key: options.key
        },
        defaults: {
            value: options.value
        }
    }
}

const mapTranslationToEntities = function (lang, translation) {
    return Object.keys(translation).reduce((memo, section) => {
        const sectionObj = translation[section]
        Object.keys(sectionObj).forEach((key) => {
            const value = sectionObj[key]
            memo.push(new TranslationEntity({lang_id: lang.id, section, key, value}))
        })
        return memo;
    }, [])
}

persistence.defineProcedure((locale, context) => {
    const {
        models,
        createOrUpdate,
        findOrCreate
    } = context
    const {
        lang,
        translation
    } = locale

    return findOrCreate(models.Lang, {
            where: {
                name: lang
            }
        })
        .flatMap((langEntity) => {
            const collection = mapTranslationToEntities(langEntity, translation)
            return Observable.fromArray(collection)
        })
        .flatMap(entity => createOrUpdate(models.Translation, entity))
})

module.exports = {
    mapper,
    persistence
}