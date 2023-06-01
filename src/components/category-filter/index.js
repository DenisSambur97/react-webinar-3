import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import SideLayout from '../../components/side-layout';
import Select from '../../components/select';

function CategoryFilter() {
    const store = useStore();
    const { t } = useTranslate();

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
            const json = await response.json();
            const newCategories = json.result.items.map((cat) => ({
                _id: cat._id,
                title: cat.title,
                parent: cat.parent ? `${cat.parent.title} - ` : '',
            }));
            setCategories(newCategories);
        }
        fetchCategories();
    }, []);

    const handleCategoryChange = useCallback(
        (categoryId) => {
            setSelectedCategory(categoryId);
            store.actions.catalog.setParams({ category: categoryId, page: 1 });
        },
        [store]
    );

    const categoryOptions = useMemo(
        () => [
            { value: 'all', title: t('all-categories') },
            ...categories.map((cat) => ({ value: cat._id, title: `${cat.parent}${cat.title}` })),
        ],
        [categories, t]
    );

    return (
        <SideLayout padding="medium">
            <Select options={categoryOptions} value={selectedCategory} onChange={handleCategoryChange} />
        </SideLayout>
    );
}

export default memo(CategoryFilter);
