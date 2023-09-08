from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver import Keys
import time
import pandas as pd
from tqdm import tqdm
from tqdm import trange


def parser(courses: list) -> None:
    all_csv = pd.DataFrame()
    i = 0

    for course in tqdm(courses, desc='Обработка курсов'):
        driver = webdriver.Chrome()
        url = 'https://welcome.stepik.org/ru'
        driver.get(url)
        driver.maximize_window()
        driver.find_element(
            by=By.XPATH, value='//*[@id="nav628757783"]/div/div/nav/ul/li[1]/a').click()
        driver.find_element(
            by=By.CLASS_NAME, value='search-form__input ').send_keys(f'{course}\n')
        time.sleep(5)
        for k in range(5):
            driver.execute_script(
                f"window.scrollTo({k * 1000}, {(k + 1) * 1000});")
            time.sleep(3)
        # driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(7)
        cartochki = driver.find_elements(
            by=By.CLASS_NAME, value='course-cards__item')
        length = len(cartochki)
        name_csv = []
        authors_csv = []
        summary_csv = []
        times_csv = []
        money_csv = []
        certificate = []
        learners = []
        workload = []
        describe_full = []
        courser_for = []
        require = []
        for number in trange(length, desc=f'Загружаем карточки для курса {course}'):
            cart_2 = driver.find_elements(
                by=By.CLASS_NAME, value='catalog-rich-card__link-wrapper')
            try:
                name = cartochki[number].find_element(
                    by=By.CLASS_NAME, value='course-card__title')
                name_csv.append(name.text)
            except:
                name_csv.append(None)
            try:
                author = cartochki[number].find_element(
                    by=By.CLASS_NAME, value='course-card__author')
                authors_csv.append(author.text)
            except:
                authors_csv.append(None)
            try:
                sum = cartochki[number].find_element(
                    by=By.CLASS_NAME, value='course-card__summary')
                summary_csv.append(sum.text)
            except:
                summary_csv.append(None)
            try:
                expense = cartochki[number].find_element(
                    by=By.CLASS_NAME, value='course-card__price')
                money_csv.append(expense.text)
            except:
                money_csv.append(None)
            try:
                flag_0 = True
                flag_1 = True
                flag_2 = True
                information = cartochki[number].find_elements(
                    by=By.CLASS_NAME, value='course-card__widget')
                for info in information:
                    label = info.get_attribute('aria-label')
                    if 'certificate' in label:
                        certificate.append(True)
                        flag_0 = False
                    if 'learners' in label:
                        index = label.find('learners')
                        participation = label[index - 5:index]
                        if 'e' in participation:
                            participation = participation.split(' ')[1]
                        if 'K' in participation:
                            participation = float(participation.replace(
                                ' ', '').replace('K', '')) * 1000
                        learners.append(int(participation))
                        flag_1 = False
                    if 'workload' in label:
                        index = label.find('ч')
                        workload.append(
                            int(label[index - 3:index].replace(' ', '')))
                        flag_2 = False
                if flag_0:
                    certificate.append(False)
                if flag_1:
                    learners.append(None)
                if flag_2:
                    workload.append(None)
            except:
                if flag_0:
                    certificate.append(False)
                if flag_1:
                    learners.append(None)
                if flag_2:
                    workload.append(None)
                continue
        #     cart_2[number].click()
        #     time.sleep(5)
        #     stories = driver.find_elements(by=By.CLASS_NAME, value='html-content')
        #     for j, story in enumerate(stories):
        #         if len(stories) == 0:
        #             describe_full.append(None)
        #             courser_for.append(None)
        #             require.append(None)
        #             break
        #         if j == 0:
        #             describe_full.append(story.text)
        #             continue
        #         if len(stories) == 1:
        #             courser_for.append(None)
        #             require.append(None)
        #             break
        #         if j == 1:
        #             courser_for.append(story.text)
        #             continue
        #         elif len(stories) == 2:
        #             require.append(None)
        #             break
        #         if j == 2:
        #             require.append(story.text)
        #         else:
        #             break
        #
        # driver.back()
        # time.sleep(5)
        # cartochki = driver.find_elements(by=By.CLASS_NAME, value='course-cards__item')
        # k = np.random.randint(1, 4)
        # driver.execute_script(f"window.scrollTo({k * 1000}, {(k + 1) * 1000});")
        # time.sleep(5)
        prices = []
        for den in money_csv:
            if 'Old Price' in den:
                index = den.find('Discount Price')
                prices.append(den[index + 16:])
            else:
                index = den.find('Price')
                prices.append(den[index + 7:])
        prices_new = []
        for den in prices:
            if den == 'Бесплатно':
                prices_new.append(0)
            else:
                prices_new.append((den.replace('₽', '').replace(' ', '')))
        tema = [course] * len(name_csv)
        d_csv = {
            'Тема': tema,
            'Название курса': name_csv,
            'Авторы': authors_csv,
            'Описание (главная)': summary_csv,
            # 'Описание (карточка)': describe_full,
            # 'Начальные требования': require,
            # 'Для кого': courser_for,
            'Деньги': prices_new,
            'Часы': workload,
            'Участникии': learners,
            'Сертификат': certificate
        }
        if i == 0:
            all_csv = pd.DataFrame(d_csv)
            i += 1
        else:
            all_csv = pd.concat(
                [all_csv, pd.DataFrame(d_csv)], ignore_index=True)
            print(f'Length massive {len(all_csv)}')
    all_csv.to_csv('Stepic.csv', encoding='utf-32')
