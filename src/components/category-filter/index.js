import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import SideLayout from '../../components/side-layout';
import Select from '../../components/select';

function CategoryFilter() {
    // Получаем экземпляр хранилища и объект t для перевода
    const store = useStore();
    const { t } = useTranslate();

    // Состояние компонента: categories - список категорий, selectedCategory - выбранная категория на данный момент
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    // Эффект, срабатывающий при загрузке компонента
    useEffect(() => {
        async function fetchCategories() {
            // Получаем список категорий из API
            const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
            const json = await response.json();
            const flatCategories = json.result.items.map((cat) => ({
                _id: cat._id,
                title: cat.title,
                parent: cat.parent ? cat.parent._id : null,
            }));

            // Строим новую структуру данных, связанную в иерархическую структуру
            const hierarchy = {};
            flatCategories.forEach((category) => {
                if (!hierarchy[category._id]) {
                    hierarchy[category._id] = { ...category, children: [] };
                }
                if (category.parent && hierarchy[category.parent]) {
                    hierarchy[category.parent].children.push(hierarchy[category._id]);
                }
            });

            // Обновляем состояние categories нашего компонента
            setCategories(hierarchy);
        }
        fetchCategories();
    }, []);

    // Обработчик события изменения выбранной категории
    const handleCategoryChange = useCallback(
        (categoryId) => {
            setSelectedCategory(categoryId);
            store.actions.catalog.setParams({ category: categoryId.replace(/-/g, ""), page: 1 });
        },
        [store]
    );

    // Функция для получения списка категорий вложенной иерархии
    const getNestedCategoryTitle = (category, indent = 0) => {
        let result = [];
        if (indent > 0) {
            const prefix = Array(indent).fill('- ').join('');
            result.push({ value: category._id, title: `${prefix} ${category.title}`, indent });
        } else {
            result.push({ value: category._id, title: category.title, indent });
        }
        category.children.forEach((childCategory) => {
            result = [...result, ...getNestedCategoryTitle(childCategory, indent + 1)];
        });
        return result;
    };

    // Получаем список вложенных категорий из состояния categories и добавляем "Все"
    const categoryOptions = useMemo(() => {
        const flatCategories = Object.values(categories).filter((cat) => !cat.parent);
        const nestedCategories = flatCategories.map((cat) => getNestedCategoryTitle(cat)).flat();
        return [{ value: '', title: t('category.all') }, ...nestedCategories];
    }, [categories, t]);

    return (
        <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleCategoryChange}
        />
    );
}

export default memo(CategoryFilter);
